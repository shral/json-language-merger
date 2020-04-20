# json-language-merger
Tool for merging and sorting (language) JSON-files

### Use Case Scenario
If you internationalize your app, you mey have a JSON file with the keys (that are used in your code) and the text to those keys.

To add another language, you copy that file, change the name of the file and translate the texts that are there.

#### Problem:
If you add to your main file some new keys with texts (or added automatically with some extaction tool) it may be that those are not added on the buttom, if you try than to add those changes to the translated files, the `git diff` will not help (becaouse by translating the new file, you changed anyway every line) in that case you will need something like this tool what we provide.

### Usage:
```
  node index.js --firstFile=./lang/default_en.json --secondFile=./lang/al.json --resultFile=./lang/new_al.json --objectPath=translations
```
`default_en.json` main JSON-file, probably generated automatically by extracting all textes from your code that are marked:

```
{
    "locale": "en",
    "translations": {
        "save_button": "Save",
        "cancle_button": "Cancel",
        "add_button": "Add",
        "saved_successfully": "File saved successfully",
        "added_successfully": "File added successfully",
        "file_doesnt_exist": "File dosen't exist",
        "edit_button": "Edit"
    }
}
    
```

`al.json` Second file that was prevoisly generated from the first one (that's why some keys are missing) and translated:

```
{
    "locale": "al",
    "translations": {
        "save_button": "Përditëso",
        "cancle_button": "Anulo",
        "added_successfully": "E dhëna u shtua me sukses",
        "file_doesnt_exist": "E dhëna nuk ekziston"
    }
}
```

Result `new_al.json` (Keys that were missing from the first file where added without overwritting the translations):

```
{
  "locale": "al",
  "translations": {
    "add_button": "Add",
    "added_successfully": "E dhëna u shtua me sukses",
    "cancle_button": "Anulo",
    "edit_button": "Edit",
    "file_doesnt_exist": "E dhëna nuk ekziston",
    "save_button": "Përditëso",
    "saved_successfully": "File saved successfully"
  }
}
```
