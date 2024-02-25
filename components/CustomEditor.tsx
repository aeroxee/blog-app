import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

interface CKeditorProps {
  initialData?: string;
}

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
    "|",
    "codeBlock",
    "highlight",
  ],
};

export default function CustomEditor({ initialData }: CKeditorProps) {
  return (
    <>
      <CKEditor
        editor={Editor}
        data={initialData}
        onChange={(_event: any, editor: any) => {
          const data = editor.getData();
          const results = document.querySelector("#results-article");
          if (!results) return;
          results.innerHTML = data;
        }}
        config={editorConfiguration}
      />
    </>
  );
}
