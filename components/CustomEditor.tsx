import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

interface CKeditorProps {
  initialData?: string;
}

interface FileLoader {
  file: Promise<File>;
}

interface ImageUploadResponse {
  url: string;
  // Atau sesuaikan dengan respons backend Anda
}

class YourImageUploadAdapter {
  private loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // Ganti URL ini sesuai dengan endpoint pengunggahan gambar di backend Anda
          const uploadUrl = `${process.env.SERVER_API_URL}/v1/upload`;

          const formData = new FormData();
          formData.append("file", file);

          fetch(uploadUrl, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json() as Promise<ImageUploadResponse>)
            .then((data) => {
              // Data harus berisi URL gambar setelah berhasil diunggah
              if (data && data.url) {
                resolve({ default: data.url });
              } else {
                reject("Gagal mengambil URL gambar dari respons server.");
              }
            })
            .catch((error) => {
              reject(`Pengunggahan gambar gagal: ${error}`);
            });
        })
    );
  }

  abort(): void {
    // Implementasi pembatalan pengunggahan gambar jika diperlukan
  }
}

function MyCustomUploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new YourImageUploadAdapter(loader);
  };
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
  extraPlugins: [MyCustomUploadPlugin],
  codeBlock: {
    languages: [
      { language: "plaintext", label: "Plaintext" },
      { language: "html", label: "HTML" },
      { language: "css", label: "CSS" },
      { language: "py", label: "Python" },
      { language: "js", label: "Javascript" },
      { language: "ts", label: "Typescript" },
      { language: "go", label: "Golang" },
      { language: "c", label: "C" },
      { language: "cpp", label: "C++" },
      { language: "bash", label: "BASH" },
    ],
  },
};

export default function CustomEditor({ initialData }: CKeditorProps) {
  return (
    <>
      <div className="text-black">
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
      </div>
    </>
  );
}
