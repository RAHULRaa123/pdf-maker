export default function BlogPage() {
  const articles = [
    {
      title: "How to Merge PDF Files Without Losing Quality",
      content: [
        "PDF merging is one of the most common document tasks used by students, businesses, and professionals. Combining multiple PDF files into one document makes sharing, printing, and managing files much easier.",

        "To merge PDF files, select the documents you want to combine, arrange them in the correct order, and use a PDF merger tool to create a single file. The original formatting, text, and layout remain organized after merging.",

        "PDF merging is useful for assignments, business reports, invoices, contracts, applications, and official documents. Instead of sending multiple attachments, users can create one professional PDF file.",

        "Before merging, always check the order of pages and remove unnecessary files. Keeping documents organized helps create a better final PDF."
      ]
    },

    {
      title: "Best Way to Convert Images to PDF on Mobile",
      content: [
        "Converting images into PDF files is useful when users need to submit documents online, create digital records, or share multiple pictures as one file.",

        "Mobile users can select images from their device, arrange them according to their requirement, and convert them into a single PDF document.",

        "Image to PDF conversion is commonly used for scanned notes, certificates, receipts, forms, assignments, and official documents.",

        "A good PDF converter keeps image quality clear while creating a properly formatted document that works across different devices."
      ]
    },

    {
      title: "Why PDF Format is Important for Documents",
      content: [
        "PDF is one of the most widely used document formats because it maintains the same appearance on different devices and operating systems.",

        "Unlike editable document formats, PDF files preserve fonts, images, spacing, and page structure. This makes them suitable for professional and official use.",

        "PDF files are commonly used for resumes, certificates, invoices, reports, forms, and educational documents.",

        "Using PDF format helps users share documents confidently without worrying about formatting changes."
      ]
    },

    {
      title: "How to Compress Images Without Losing Quality",
      content: [
        "Large image files can take more storage space and require more time to upload. Image compression reduces file size while maintaining acceptable visual quality.",

        "Compressed images are useful for websites, emails, online applications, and social media uploads where file size limits are common.",

        "A good image compressor balances quality and file size by reducing unnecessary data while keeping important details visible.",

        "Image optimization helps websites load faster and improves user experience."
      ]
    },

    {
      title: "How Students Can Use PDF Tools Effectively",
      content: [
        "Students work with digital documents regularly for assignments, projects, notes, and online submissions. PDF tools make these tasks easier and faster.",

        "Students can convert images of handwritten notes into PDFs, merge multiple assignment pages, compress large files, and organize study materials.",

        "Using PDF tools helps students maintain professional documents and submit files according to online platform requirements.",

        "Proper document management saves time and keeps academic files organized."
      ]
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 leading-8">

      <h1 className="text-4xl font-bold mb-6">
        PDF Maker Blog
      </h1>

      <p className="mb-10 text-muted-foreground">
        Learn useful guides about PDF conversion, compression, document
        management, and online file processing.
      </p>


      {articles.map((article, index) => (

        <article key={index} className="mb-12">

          <h2 className="text-2xl font-bold mb-4">
            {article.title}
          </h2>

          {article.content.map((paragraph, i) => (

            <p key={i} className="mb-4">
              {paragraph}
            </p>

          ))}

        </article>

      ))}


    </main>
  );
}
