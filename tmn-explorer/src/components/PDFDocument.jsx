import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';


const PDFDocument = () => {

  const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  return (
    <>
      <Document
            file="https://ipfs.moralis.io:2053/ipfs/QmQ1rcHPsdgG5htaZ6ZjFYnmmoMbb8txpGDx5NCL9mWQ8Q"
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document>

    </>
  );
};

export default PDFDocument;
