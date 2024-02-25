export default function stripHtmlAndTruncate(text: string, maxWords: number) {
  // Menghapus format HTML
  const plainText = text.replace(/<[^>]*>|&nbsp;/g, "");

  // Memotong teks menjadi sejumlah kata tertentu
  const words = plainText.split(/\s+/);
  const truncatedText = words.slice(0, maxWords).join(" ");

  return truncatedText;
}
