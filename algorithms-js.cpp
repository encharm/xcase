// used by build-algorithms.sh
#ifndef SKIP_ALGORITHMS
#include "algorithms.hpp"
#endif

#include <cheerp/client.h>
#include <cheerp/clientlib.h>

typedef wchar_t char_type;
using Camelize = typename Algorithms<char_type>::Camelize;
using Decamelize = typename Algorithms<char_type>::Decamelize;
using Pascalize = typename Algorithms<char_type>::Pascalize;
using Depascalize = typename Algorithms<char_type>::Depascalize;

using namespace cheerp;

using namespace client;

class [[cheerp::jsexport]] XCase {
public:
  XCase() {}

  template<class Algorithm, class ...Args>
  inline String* xcase(String* inString, Args... args) {
    int length = inString->get_length();
    char_type inBuffer[length+1];
    for(int i = 0;i < length; ++i) {
      inBuffer[i] = inString->charCodeAt(i);
    }
    char_type outBuffer[length*2+1];
    if(!Algorithm::Run(inBuffer, length, outBuffer, args...)) {
      return inString;
    }
    return new String(outBuffer);
  }

  String* camelize(String* inString) {
    return xcase<Camelize>(inString);
  }
  String* decamelize(String* inString, String* separator) {
    return xcase<Decamelize>(inString, separator->get_length() ? separator->charCodeAt(0) : L'_');
  }
  String* pascalize(String* inString) {
    return xcase<Pascalize>(inString);
  }
  String* depascalize(String* inString, String* separator) {
    return xcase<Depascalize>(inString, separator->get_length() ? separator->charCodeAt(0) : L'_');
  }
};

void webMain()
{
  __asm__("module.exports = (new XCase);");
}
