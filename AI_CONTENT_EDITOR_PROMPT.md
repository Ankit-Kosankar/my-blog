# AI Content Editor Prompt

This is a reusable AI prompt for editing Markdown blog posts while preserving your voice and technical accuracy.

## Usage

1. Write your first draft in Markdown
2. Copy the prompt below and paste your content
3. Run it through your AI assistant (Claude, ChatGPT, etc.)
4. Review the suggestions and accept/reject changes
5. Run through the publishing checklist
6. Publish

---

## The Prompt

```
You are an expert technical editor helping improve a Markdown blog post while preserving the author's voice and technical accuracy.

POST TO EDIT:
[Paste your markdown content here, including frontmatter]

EDITING INSTRUCTIONS:
1. **Structure & Flow**: Improve paragraph transitions, ensure logical flow, check heading hierarchy (H2 → H3)
2. **Clarity**: Simplify complex sentences without dumbing down technical content
3. **Readability**: Break up long paragraphs, add whitespace, improve formatting
4. **Technical Accuracy**: Verify code examples are correct, check technical terminology
5. **Voice Preservation**: Maintain the author's conversational tone, keep "I" statements, preserve personal anecdotes
6. **SEO**: Ensure target keyword appears naturally in first paragraph and headings (if provided)
7. **Engagement**: Add hooks in introduction, ensure conclusion has clear takeaways

OUTPUT FORMAT:
- Return the improved Markdown (including frontmatter)
- Include a brief summary of changes made
- Note any technical concerns or questions

DO NOT:
- Change the author's opinions or conclusions
- Remove personal anecdotes or "I" statements
- Over-formalize the language
- Add fluff or unnecessary words
- Modify code examples unless they're clearly incorrect
```

---

## Publishing Checklist

Before publishing, ensure:

- [ ] Title is clear and compelling (50-60 chars)
- [ ] Description is 120-160 chars, summarizes content
- [ ] Target keyword included naturally in first paragraph (if SEO-focused)
- [ ] At least one image (hero image or inline)
- [ ] Proper heading hierarchy (H2 → H3)
- [ ] Code examples tested and working
- [ ] Internal links added to related posts
- [ ] Tags and category assigned
- [ ] Post type selected (essay/note/opinion/tutorial/log)
- [ ] Reading time calculated (auto-calculated on publish)
- [ ] Draft set to `false`
- [ ] Preview in browser, check formatting
- [ ] Spell check and grammar review
- [ ] Series information added (if part of a series)

---

## Content Types

### Essay (2000+ words)
- Deep technical dives
- Architecture decisions
- System design explanations
- Use for: Comprehensive topics, deep analysis

### Note (500-1500 words)
- Quick learnings
- Code snippets with context
- Tool reviews
- Use for: Short insights, quick tips

### Opinion (300-1000 words)
- Takes on industry trends
- Personal philosophy
- "Why I think X" posts
- Use for: Personal takes, reflections

### Tutorial (1000-3000 words)
- Step-by-step guides
- How-to content
- Use for: Teaching, walkthroughs

### Log (Variable length)
- Learning journey entries
- Experiment results
- "What I learned this week/month"
- Use for: Documentation, experiments

---

## Voice Guidelines

- **Conversational but professional**: Write like you're explaining to a colleague
- **Use "I" statements**: Share personal experiences and opinions
- **Include "why"**: Don't just explain what, explain why
- **Show thinking process**: Reveal how you arrived at conclusions
- **Be honest**: Admit when something was difficult or you're uncertain

---

## Example Workflow

1. **Draft**: Write your post in Markdown
2. **AI Edit**: Run through the prompt above
3. **Review**: Accept/reject AI suggestions
4. **Manual Review**: Check technical accuracy, test code
5. **Checklist**: Run through publishing checklist
6. **Publish**: Set draft to false and deploy

---

## Tips

- Save the prompt as a template in your note-taking app
- Customize the prompt based on your specific needs
- Use AI for structure and clarity, not for changing your voice
- Always review AI suggestions - they're not always right
- Test code examples yourself, don't trust AI blindly
