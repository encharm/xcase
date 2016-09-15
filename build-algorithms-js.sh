#!/bin/bash
(cat algorithms.hpp algorithms-js.cpp) | docker run -i rushpl/cheerp bash -c ' 
cat > /root/algorithms.cpp && /opt/cheerp/bin/clang++ -O3 -nostdlib -fshort-wchar -D SKIP_ALGORITHMS -target cheerp /root/algorithms.cpp -o /root/algorithms.js && cat /root/algorithms.js
' | node_modules/.bin/uglifyjs -c -b > algorithms.js