export const HeadingBlockList = {
    h1: "header-one",
    h2: "header-two",
    h3: "header-three",
    h4: "header-four",
    h5: "header-five",
    h6: "header-six",
}

export const INLINE_STYLE_TASK_EDITOR = {
    "marker": {
        background: "var(--bs-primary)",
        color: "white",
    },
    "italic": { fontStyle: "italic" },
    "bold": { fontWeight: "bold" },
}

export type TInlineStyleTaskEditor = keyof typeof INLINE_STYLE_TASK_EDITOR;