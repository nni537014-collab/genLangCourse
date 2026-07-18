# genLangCourse
@todo

src\service\dictionary.ts -- validation
types for h5p content
drag text
multimediachoice
multichoice

const file = templClone.media.type.params.files[0]; // type not correct src\service\generators\content\multi_choice.ts
validate parsed json for redirect type - log parse errors that don't match src\service\dictionary.ts
finish discrimated union for all course presentation 

Write (util func) h5p.json implementation

delete src\types\dictionary.ts

CMDS

 head -n 10000 assets/dictionary/es-extract.jsonl | grep '^{"word": "' | sed 's/$/,/' | sed '1s/^/[/' | sed '$s/,$/]/' | quicktype --lang typescript-zod --top-level CourseDataNode -o src/types/CourseDataNodeZod.ts

  npx madge --image graph.png src/
