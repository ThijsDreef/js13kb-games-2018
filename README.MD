### 2018 js 13kb game

this is a repo for my entry to http://2018.js13kgames.com/

#### building
to build my project on windows only you can type build

it will start executing in order:
- create js.txt ('a text file containing all js file names')
- run a java application that runs the compiler with all the file names ('to lazy to do that in batch')
- then it updates bundle.js wich then gets zipped by 7zip command line tool
- then batch spits out the number of bytes used
