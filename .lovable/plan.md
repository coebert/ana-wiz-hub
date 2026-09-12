# Topic discussions

## Goal
Add a live discussion area to every topic where readers can ask questions and reply to one another.

## User experience
- Show the latest discussion for the current topic beneath its learning content.
- Let signed-in learners post a question and reply to individual messages.
- Show a clear sign-in/create-account action to signed-out readers.
- Display a privacy-safe learner name rather than an email address.
- Allow authors to remove their own messages; removing a question also removes its replies.
- Include loading, empty, submission and error states, with a compact mobile layout.

## Data and safety
- Add a dedicated discussion table in Lovable Cloud with topic, author, parent-message, body and timestamps.
- Discussions are publicly readable so they appear on the live site.
- Posting and deleting require an account; database rules enforce ownership for deletion and prevent posting as another user.
- Limit message length and replies to one level, and validate content in both the page and database.

## Technical details
- Build one shared discussion component and place it in the shared topic template, covering every standard topic page without repetitive edits.
- Load only messages for the current topic, ordered chronologically, then render replies beneath their parent question.
- Use live database updates so new questions and replies appear without refreshing.
- Apply the schema through a migration with explicit grants and row-level access policies.

## Verification
- Verify public reading, signed-in question/reply creation, ownership controls and live updates.
- Check desktop and mobile rendering, type safety and the preview build.
