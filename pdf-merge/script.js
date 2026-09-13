const { degrees, PDFDocument, StandardFonts, rgb } = PDFLib;

let filesList = [];

document.getElementById("select-files-button").addEventListener('click', ev => {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.accept = ".pdf";
  input.addEventListener('change', ev => {
    const files = input.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        filesList.push(file);
      }
      drawFiles();
    }
  })
  input.click();
})
document.getElementById("merge-button").addEventListener('click', ev => {
  mergePDFs();
})
function drawFiles() {
  const container = document.getElementById("files-container");
  container.innerHTML = "";
  filesList.forEach(file => {
    const block = document.createElement("div");
    block.style.display = "flex";
    block.classList.add("file-block");
    const nameElem = document.createElement("span");
    nameElem.classList.add("file-name");
    nameElem.innerText = file.name;
    const dragHandle = document.createElement("span");
    dragHandle.classList.add("drag-handle");
    dragHandle.classList.add("material-symbols-outlined");
    dragHandle.innerText = "drag_indicator";
    const removeButton = document.createElement("span");
    removeButton.classList.add("remove-button");
    removeButton.classList.add("material-symbols-outlined");
    removeButton.innerText = "close";
    removeButton.style.cursor = "pointer";
    dragHandle.style.cursor = "grab";

    block.appendChild(dragHandle);
    block.appendChild(nameElem);
    block.appendChild(removeButton);
    container.appendChild(block);

    dragHandle.addEventListener('mousedown', ev => {
      ev.preventDefault();
      const initialY = ev.clientY;
      const initialIndex = filesList.indexOf(file);
      const itemHeight = block.offsetHeight || 30;

      block.style.position = "relative";
      block.style.zIndex = "1000";
      dragHandle.style.cursor = "grabbing";

      const onMouseMove = moveEv => {
        const deltaY = moveEv.clientY - initialY;
        block.style.transform = `translateY(${deltaY}px)`;
      };

      const onMouseUp = upEv => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        block.style.position = "";
        block.style.zIndex = "";
        block.style.transform = "";
        dragHandle.style.cursor = "grab";

        const deltaY = upEv.clientY - initialY;
        const indexOffset = Math.round(deltaY / itemHeight);
        let targetIndex = initialIndex + indexOffset;
        targetIndex = Math.max(0, Math.min(filesList.length - 1, targetIndex));

        if (targetIndex !== initialIndex) {
          const [movedItem] = filesList.splice(initialIndex, 1);
          filesList.splice(targetIndex, 0, movedItem);
        }
        drawFiles();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    removeButton.addEventListener('click', ev => {
      const index = filesList.indexOf(file);
      if (index > -1) {
        filesList.splice(index, 1);
        drawFiles();
      }
    });
  })
}


async function mergePDFs() {
  if(filesList.length < 2) {
    alert("Please select at least two PDF files to merge.");
    return;
  }
  const mergedPdf = await PDFDocument.create();



  const pdfBytesArray = await Promise.all(filesList.map(file => file.arrayBuffer()));




  for (const pdfBytes of pdfBytesArray) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'merged.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}