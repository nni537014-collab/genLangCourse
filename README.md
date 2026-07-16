# genLangCourse
@todo

types for h5p content
drag text
multimediachoice
multichoice

finish discrimated union for all course presentation 

Write (util func) h5p.json implementation

delete src\types\dictionary.ts

CMDS

 head -n 10000 assets/dictionary/es-extract.jsonl | grep '^{"word": "' | sed 's/$/,/' | sed '1s/^/[/' | sed '$s/,$/]/' | quicktype --lang typescript-zod --top-level CourseDataNode -o src/types/CourseDataNodeZod.ts

  npx madge --image graph.png src/
