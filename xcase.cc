#include <nan.h>
#include <cctype>

namespace xcase {
  static inline bool isdigit(char16_t c) {
    return c >= L'0' && c <= L'9';
  }
  static inline bool isupper(char16_t c) {
    return c >= L'A' && c <= L'Z';
  }
  static inline bool islower(char16_t c) {
    return c >= L'a' && c <= L'z';
  }
  static inline char16_t toupper(char16_t c) {
    if(islower(c)) {
      return c - (L'a' - L'A');
    }
    return c;
  }
  static inline char16_t tolower(char16_t c) {
    if(isupper(c)) {
      return c + (L'a' - L'A');
    }
    return c;
  }
}

struct Camelize {
  inline static bool Run(char16_t* str, size_t len, char16_t* out) {
    uint j = 0;
    bool changed = false;
    if(xcase::isdigit(str[0]) || str[0] == L'-') {
      return false;
    }
  
    for(uint i = 0; i < len; ++i) {
      auto c = str[i];
      if(c == L'_' || c == L' ' || c == L'-') {
        changed = true;
        c = str[++i]; 
        if(c == 0) {
          return false;
        }
        out[j++] = xcase::toupper(c);
      } else if(i == 0 && xcase::isupper(c)) {
        changed = true;
        out[j++] = xcase::tolower(c);
      } else {
        out[j++] = c;
      }
    }
    out[j] = 0;
    return changed;
  }
};

struct Decamelize {
  inline static bool Run(char16_t* str, size_t len, char16_t* out, char16_t separator = L'_') {
    uint j = 0;
    if(!xcase::islower(str[0])) {
      return false;
    }
    bool changed = false;
    for(uint i = 0; i < len; ++i) {
      auto c = str[i];
      if(xcase::isupper(c)) {
        out[j++] = separator;
        out[j++] = xcase::tolower(c);
        changed = true;
      } else {
        out[j++] = c;
      }
    }
    out[j] = 0;
    return changed;
  }
};

struct Pascalize {
  inline static bool Run(char16_t* str, size_t len, char16_t* out) {
    uint j = 0;
    bool changed = false;
    if(xcase::isdigit(str[0]) || str[0] == L'-') {
      return false;
    }
    for(uint i = 0; i < len; ++i) {
      auto c = str[i];
      if(c == L'_' || c == L' ' || c == L'-') {
        changed = true;
        c = str[++i]; 
        if(c == 0) {
          return false;
        }
        out[j++] = xcase::toupper(c);
      } else if(i == 0 && xcase::islower(c)) {
        changed = true;
        out[j++] = xcase::toupper(c);
      } else {
        out[j++] = c;
      }
    }
    out[j] = 0;
    return changed;
  }
};

struct Depascalize {
  inline static bool Run(char16_t* str, size_t len, char16_t* out, char16_t separator = L'_') {
    uint j = 0;
    
    if(!xcase::isupper(str[0])) {
      return false;
    }
    bool changed = false;
    for(uint i = 0; i < len; ++i) {
      auto c = str[i];
      if(xcase::isupper(c)) {
        if(i > 0) { 
          out[j++] = separator;
        }
        out[j++] = xcase::tolower(c);
        changed = true;
      } else {
        out[j++] = c;
      }
    }
    out[j] = 0;
    return changed;
  }
};

template<class Algorithm>
struct StringRunner {
public:
  template<class ...Args>
  static v8::Local<v8::String> Run(v8::Local<v8::String>& str, Args... args) {
    size_t len = str->Length();
    if(len <= 1) {
      return str;
    }
    char16_t buffer[len + 1];
    char16_t newBuffer[len*2 + 1];
    str->Write((uint16_t*)(buffer));
    
    if(Algorithm::Run(buffer, len, newBuffer, args...)) {
      return v8::String::NewFromTwoByte(v8::Isolate::GetCurrent(), (uint16_t*)newBuffer);
    }
    return str;  
  }
};

template<class KeyProcessor, bool InPlace = false, class ...Args>
static v8::Local<v8::Object> ProcessKeys(v8::Local<v8::Object> object, Args... args) {
  Nan::EscapableHandleScope scope;
  auto newObject = InPlace ? object : (object->IsArray() ? Nan::New<v8::Array>().As<v8::Object>(): Nan::New<v8::Object>());

  if(object->IsArray()) {
    auto objectArray = object.As<v8::Array>();
    auto newObjectArray = newObject.As<v8::Array>();
    
    for(uint i = 0; i < objectArray->Length(); ++i) {
      auto value = objectArray->Get(i);  
      auto newValue = value;
      if(value->IsObject() && !value->IsDate()) {
        newValue = ProcessKeys<KeyProcessor>(value.As<v8::Object>(), args...).template As<v8::Value>();
      }
      if(InPlace) {
        if(value != newValue) {
          newObjectArray->Set(i, newValue);
        }
      } else {
        newObjectArray->Set(i, newValue);
      }
    }  
    return scope.Escape(newObjectArray);
  }
  
  auto propertyNames = object->GetOwnPropertyNames();
  for(uint i = 0; i < propertyNames->Length(); ++i) {
    auto key = propertyNames->Get(i);
    auto value = object->Get(key);
    auto newValue = value;
    if(value->IsObject() && !value->IsDate() && !value->IsFunction()) {
      newValue = ProcessKeys<KeyProcessor>(value.As<v8::Object>(), args...).template As<v8::Value>();
    }
    if(!key->IsString()) {
      if(InPlace) {
        if(value != newValue) {
          newObject->Set(key, newValue);
        }        
      } else {
        newObject->Set(key, newValue);
      }
      continue;
    }
    auto keyString = key.As<v8::String>();
    auto newKey = KeyProcessor::Run(keyString, args...);
    if(InPlace) {
      if(value != newValue || newKey != keyString) {
        newObject->Set(newKey, newValue);
      }
      if(newKey != keyString) {
        newObject->Delete(key);
      }
    } else {
      newObject->Set(newKey, newValue);
    }
  }
  return scope.Escape(newObject);
}

template<class Algorithm>
static NAN_METHOD(XCaseKeys) {
  if(!info[0]->IsObject()) {
    info.GetReturnValue().Set(info[0]);
    return;
  }
  bool inPlace = false;
  if(info[1]->IsObject()) {
    auto inPlaceKey = Nan::New("inPlace").ToLocalChecked();
    auto options = info[1]->ToObject();
    if(options->Has(inPlaceKey)) {
      inPlace = true;;
    }
  }
  auto object = info[0].As<v8::Object>();
  auto retValue = inPlace ? 
    ProcessKeys<StringRunner<Algorithm>, true>(object) :
    ProcessKeys<StringRunner<Algorithm>, false>(object);
  info.GetReturnValue().Set(retValue);
}

template<class Algorithm>
static NAN_METHOD(DeXCaseKeys) {
  if(!info[0]->IsObject()) {
    info.GetReturnValue().Set(info[0]);
    return;
  }
  char16_t separator = L'_';
  bool inPlace = false;
  if(info[1]->IsObject()) {
    auto separatorKey = Nan::New("separator").ToLocalChecked();
    auto inPlaceKey = Nan::New("inPlace").ToLocalChecked();
    auto options = info[1]->ToObject();
    if(options->Has(separatorKey)) {
      auto separatorString = info[1]->ToObject()->Get(separatorKey)->ToString();
      if(separatorString->Length() > 1) {
        Nan::ThrowTypeError("Separator should be a single character");
        return;
      }
      separatorString->Write((uint16_t*)&separator, 0, 1, v8::String::NO_NULL_TERMINATION);
    }
    if(options->Has(inPlaceKey)) {
      inPlace = true;;
    }
  }
  auto object = info[0].As<v8::Object>();
  
  auto retValue = inPlace ? 
    ProcessKeys<StringRunner<Algorithm>, true>(object, separator) :
    ProcessKeys<StringRunner<Algorithm>, false>(object, separator);
  info.GetReturnValue().Set(retValue);
}

template<class Algorithm>
static NAN_METHOD(XCaseMethod) {
  if(!info[0]->IsString()) {
    Nan::ThrowTypeError("Argument should be a String");
    return;
  }
  auto str = info[0].As<v8::String>();
  info.GetReturnValue().Set(StringRunner<Algorithm>::Run(str));
}

template<class Algorithm>
static NAN_METHOD(DeXCaseMethod) {
  char16_t separator = L'_';
  if(!info[0]->IsString()) {
    Nan::ThrowTypeError("Argument should be a String");
    return;
  }
  if(info[1]->IsObject()) {
    auto separatorKey = Nan::New("separator").ToLocalChecked();
    auto options = info[1]->ToObject();
    if(options->Has(separatorKey)) {
      auto separatorString = info[1]->ToObject()->Get(Nan::New("separator").ToLocalChecked())->ToString();
      if(separatorString->Length() > 1) {
        Nan::ThrowTypeError("Separator should be a single character");
        return;
      }
      separatorString->Write((uint16_t*)&separator, 0, 1, v8::String::NO_NULL_TERMINATION);
    }
  }
  auto str = info[0].As<v8::String>();
  info.GetReturnValue().Set(StringRunner<Algorithm>::Run(str, separator));
}


NAN_MODULE_INIT(Init) {
  Nan::Export(target, "camelize", XCaseMethod<Camelize>);
  Nan::Export(target, "decamelize", DeXCaseMethod<Decamelize>);
  Nan::Export(target, "camelizeKeys", XCaseKeys<Camelize>);
  Nan::Export(target, "decamelizeKeys", DeXCaseKeys<Decamelize>);

  Nan::Export(target, "pascalize", XCaseMethod<Pascalize>);
  Nan::Export(target, "depascalize", DeXCaseMethod<Depascalize>);
  Nan::Export(target, "pascalizeKeys", XCaseKeys<Pascalize>);
  Nan::Export(target, "depascalizeKeys", DeXCaseKeys<Depascalize>);
};

NODE_MODULE(xcase, Init)
