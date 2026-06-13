# Volk Product Roadmap

Prioritized by user and organizational impact, regardless of implementation effort.

## 1. Permissions and access control - Completed for local use (June 11, 2026)

Volk now uses the server-side operating-system identity and group memberships rather than
trusting identity details sent by the browser. The sniffer records ownership, POSIX
permissions, ACL principals, and effective readability. Every document and owner read path
is filtered by the API before data reaches the UI; missing permission metadata fails closed.
The UI shows the active identity and each result's access level, and the local API listens
only on localhost by default.

Future shared-server deployments should add organization sign-in/SSO and map that identity
to these same authorization checks.

## 2. Real ownership and source tracking - Completed (June 11, 2026)

Each watched folder is now a source profile with a stable ID, friendly name, source type,
optional department or team, and optional responsible owner. Every indexed document records
its source root, relative location, source access context, embedded author, filesystem owner,
and resolved content owner. When no owner is assigned, Volk falls back to document metadata
and then filesystem ownership. Search results make those distinctions visible instead of
flattening every kind of ownership into one ambiguous name.

## 3. Powerful search and filtering - Completed (June 13, 2026)

Search now supports simple keyword searches plus optional filters for file type, owner,
folder, modified date, size, author, keywords, and source. Results can be sorted by
relevance, date, name, size, or owner, and matching terms are highlighted in each result.
Available filter choices and returned documents are both permission-aware.

## 4. Document previews

Preview PDFs, Office documents, images, and extracted text without opening the original
file.

## 5. Accurate folder synchronization

Detect deleted, renamed, moved, and modified files so the index never keeps stale records.

## 6. Indexing dashboard

Show scan progress, current activity, files processed, failures, skipped files, and last
successful scan time.

## 7. Cases and saved collections

Group relevant documents into investigations, audits, legal cases, or projects.

## 8. OCR for scanned documents

Make scanned PDFs and images searchable, including receipts, signed forms, and photographed
pages.

## 9. Duplicate and version detection

Identify identical files and related versions, such as final, final-2, and actually-final.

## 10. Search snippets and match explanations

Show exactly where and why a document matched a search.

## 11. Semantic search

Support natural-language searches even when the exact search words are absent.

## 12. Connectors beyond local folders

Index SharePoint, OneDrive, Google Drive, Dropbox, network drives, email, and cloud storage.

## 13. Document actions

Open the original file, reveal it in Finder, copy its location, download it, or share an
approved link.

## 14. Tags, notes, and review status

Label documents as relevant, privileged, reviewed, duplicate, or requiring follow-up.

## 15. Exports, audit history, and legal hold

Export selected documents and reports, record access activity, and preserve files from
deletion when required.
