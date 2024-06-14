import PdfViewer from "./PdfViewer";

const App = () => {
  const pdfFile = "/sample.pdf";
  return (
    <div className="App">
      <h1>PDF Viewer</h1>
      <PdfViewer file={pdfFile} />
    </div>
  );
};

export default App;
