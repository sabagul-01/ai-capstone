# AI-Assisted Development Workflow

## Round 1: Vague Prompt

In Round 1, I gave the AI assistant a relatively vague prompt to create the settings form. The resulting implementation focused on producing the requested interface and functionality based on the general requirements. The assistant created the settings form using vanilla HTML, CSS, and JavaScript and implemented the basic structure and behavior.

The main advantage of the vague prompt was that it allowed the AI assistant to make more implementation decisions independently. However, this also meant that some requirements were not specified in enough detail, so the assistant had more freedom to interpret what was expected.

The Round 1 implementation was then committed using the Conventional Commit message:

`feat: add settings form from vague prompt`

## Round 2: Precise Prompt

For Round 2, I used a much more precise prompt that described the expected behavior and implementation requirements. The assistant first reviewed the workspace and produced an implementation plan before making changes.

The precise requirements included accessible validation messages, required name validation, email validation, theme validation, localStorage persistence using `userSettings`, loading saved values when the page opens, success feedback, graceful handling of invalid stored data, and automated tests.

The assistant created:

- `index.html`
- `styles.css`
- `script.js`
- `package.json`
- `package-lock.json`
- `script.test.js`

The automated tests initially failed because the DOM-based tests required a browser-like environment. The assistant identified that Jest was using the default Node environment, configured Jest to use jsdom, installed `jest-environment-jsdom`, and reran the tests successfully. The final result was 6 passing tests.

The Round 2 changes were committed using:

`feat: improve settings form validation and persistence`

The branch was then pushed to GitHub as `round-2-precise`.

## Comparison and Lessons Learned

The main difference between the two rounds was the level of detail in the prompt. The vague prompt gave the AI more freedom to decide how to implement the task, while the precise prompt clearly defined the expected behavior, validation rules, persistence requirements, accessibility considerations, and testing requirements.

I learned that precise prompts make AI-assisted development more predictable because the assistant has clearer acceptance criteria. I also learned that AI-generated code still needs to be tested and reviewed. In Round 2, the failed Jest tests revealed an environment configuration issue that had to be identified and corrected.

Overall, the second workflow was more structured and easier to verify because the requirements and expected outcomes were explicitly defined.