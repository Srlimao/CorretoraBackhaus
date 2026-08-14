import os
import sys

pdf_path = os.path.join("docs", "empreendimentos", "Nápoles", "Nápoles - Folder.pdf")

try:
    import pypdf
    reader = pypdf.PdfReader(pdf_path)
    print(f"Total Pages: {len(reader.pages)}")
    for i, page in enumerate(reader.pages):
        print(f"\n==================== PAGE {i+1} ====================")
        print(page.extract_text())
except Exception as e:
    print("pypdf error:", e)
    try:
        import fitz # PyMuPDF
        doc = fitz.open(pdf_path)
        print(f"PyMuPDF Total Pages: {len(doc)}")
        for i, page in enumerate(doc):
            print(f"\n==================== PAGE {i+1} ====================")
            print(page.get_text())
    except Exception as e2:
        print("fitz error:", e2)
        try:
            import pdfplumber
            with pdfplumber.open(pdf_path) as pdf:
                for i, page in enumerate(pdf.pages):
                    print(f"\n==================== PAGE {i+1} ====================")
                    print(page.extract_text())
        except Exception as e3:
            print("pdfplumber error:", e3)
