export default function BlogPage() {
  const articles = [
    {
      title: "How to Merge PDF Files Online (Step-by-Step Guide)",
      content: [
        "Merging PDF files means combining multiple PDF documents into one single file. This is useful for students, office workers, and job applications.",
        "Step 1: Open PDF merger tool in browser.",
        "Step 2: Upload multiple PDF files.",
        "Step 3: Arrange files in correct order.",
        "Step 4: Click merge button and process file.",
        "Step 5: Download final merged PDF.",
        "Tip: Always check order before merging."
      ]
    },
    {
      title: "How to Convert Images to PDF",
      content: [
        "Image to PDF tool helps convert photos, notes, and scanned documents into one PDF file.",
        "Step 1: Open Image to PDF tool.",
        "Step 2: Upload images.",
        "Step 3: Arrange order.",
        "Step 4: Click convert.",
        "Step 5: Download PDF file.",
        "Useful for students, certificates, and forms."
      ]
    },
    {
      title: "Why PDF is Better than Word File",
      content: [
        "PDF keeps formatting same on all devices.",
        "Word files can change layout depending on system.",
        "PDF is best for resumes, certificates, invoices and official documents.",
        "That is why most companies prefer PDF format."
      ]
    },
    {
      title: "How to Reduce Image Size Without Losing Quality",
      content: [
        "Large images take more storage and slow upload speed.",
        "Compression reduces file size while keeping quality.",
        "Best formats: JPG and WebP.",
        "Always keep original file backup."
      ]
    }
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "40px", lineHeight: "1.8" }}>
      <h1>PDF Maker Blog</h1>
      <p>
        Learn simple guides about PDF tools, image conversion, compression, and document handling.
      </p>

      {articles.map((article, i) => (
        <article key={i} style={{ marginTop: "40px" }}>
          <h2>{article.title}</h2>
          {article.content.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </article>
      ))}
    </div>
  );
}
