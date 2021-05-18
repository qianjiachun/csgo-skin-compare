import pages from "./pages"
for (const key in pages) {
    Object(pages[key]).router.init();
}