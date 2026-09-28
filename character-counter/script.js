
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const symbolCount = document.getElementById("symbolCount");
const spaceCount = document.getElementById("spaceCount");
const lineCount = document.getElementById("lineCount");

localStorage.getItem("textInput") && (textInput.value = localStorage.getItem("textInput"));
count(textInput.value);

textInput.addEventListener("input", () => {
  count(textInput.value);
  localStorage.setItem("textInput", textInput.value);
});

function count(text) {
  const segmenter = new Intl.Segmenter("ja", {
    granularity: "word"
  });

  const words = [...segmenter.segment(text)]
    .filter(item => item.isWordLike);

  charCount.textContent = text.replaceAll(/\n/g, '').replaceAll(/\s/g, '').replaceAll("　", '').length;
  wordCount.textContent = words.length;
  symbolCount.textContent = (text.match(/[^\p{L}\p{N}\s]/gu) ?? []).length;
  spaceCount.textContent = (text.match(/\s/g) ?? []).length;
  lineCount.textContent = text.split(/\r\n|\r|\n/).length;
}