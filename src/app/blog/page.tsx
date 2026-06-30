export default function BlogPage() {
  const articles = [
    {
      title: "How to Merge PDF Files Without Losing Quality",
      content: [
        "Merging PDF files helps users combine multiple documents into a single organized file without changing formatting or quality.",
        "To merge PDFs, select your files in order, upload them into a PDF tool, and download the combined file. This is useful for reports, assignments, invoices, and official documents.",
        "Always ensure file order is correct before merging to avoid confusion in final documents."
      ]
    },
    {
      title: "Best Way to Convert Images to PDF on Mobile",
      content: [
        "Converting images to PDF on mobile is useful for students and office users who need quick document sharing.",
        "Select multiple images, arrange them, and convert into a single PDF file for easy upload and sharing.",
        "This method helps in exams, online forms, and document submissions."
      ]
    },
    {
      title: "Why PDF Format is Important for Documents",
      content: [
        "PDF format keeps layout, fonts, and structure same across all devices.",
        "It is widely used for resumes, certificates, forms, and official documents.",
        "Unlike editable formats, PDFs maintain consistency and professionalism."
      ]
    },
    {
      title: "How to Compress Images Without Losing Quality",
      content: [
        "Image compression reduces file size while maintaining visual clarity.",
        "This helps in faster uploads, email sharing, and website optimization.",
        "Always use optimized compression to avoid pixel loss."
      ]
    },
    {
      title: "How Students Can Use PDF Tools Effectively",
      content: [
        "Students can use PDF tools for assignments, notes, and project submissions.",
        "They can convert handwritten notes into PDF, merge files, and compress documents.",
        "This improves organization and saves time during submissions."
      ]
    }
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "40px", lineHeight: "1.8" }}>
      <h1>PDF Maker Blog</h1>

      <p>
        Learn practical guides about PDF tools, file management, compression, conversion, and document handling.
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
