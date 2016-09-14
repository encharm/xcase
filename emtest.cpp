#include "algorithms.hpp"

#include <emscripten/bind.h>

using Camelize = typename Algorithms<wchar_t>::Camelize;
using Decamelize = typename Algorithms<wchar_t>::Decamelize;
using Pascalize = typename Algorithms<wchar_t>::Pascalize;
using Depascalize = typename Algorithms<wchar_t>::Depascalize;
using char_type = typename Algorithms<wchar_t>::char_type;

using namespace emscripten;

std::wstring camelize(std::wstring in) {
  char_type outBuffer[in.size()*2];
  
  Camelize::Run((const char_type*)in.data(), in.size(), outBuffer);
  return std::wstring((const char_type*)outBuffer);
}

EMSCRIPTEN_BINDINGS(xcase) {
  function("camelize", &camelize);
}
