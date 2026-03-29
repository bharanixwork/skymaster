/**
 * Utility to export user notes as a professional Markdown logbook.
 */
export const exportNotesAsMarkdown = (notes: Record<string, string>, curriculum: any[]) => {
  let markdown = `# SkyMaster UAS Engineering Logbook\n`;
  markdown += `*Generated on ${new Date().toLocaleDateString()}*\n\n`;
  markdown += `--- \n\n`;

  let hasNotes = false;

  curriculum.forEach(chapter => {
    let chapterHasNotes = false;
    let chapterSection = `## ${chapter.title}\n\n`;

    chapter.subChapters.forEach((sub: any) => {
      const note = notes[sub.id];
      if (note && note.trim()) {
        chapterSection += `### ${sub.title}\n\n${note.trim()}\n\n---\n\n`;
        chapterHasNotes = true;
        hasNotes = true;
      }
    });

    if (chapterHasNotes) {
      markdown += chapterSection;
    }
  });

  if (!hasNotes) {
    alert("No notes found to export. Start documenting your flight engineering journey in the Logbook section of each lesson!");
    return;
  }

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SkyMaster_Engineering_Logbook_${new Date().toISOString().split('T')[0]}.md`;
  a.click();
  URL.revokeObjectURL(url);
};
