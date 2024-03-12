export const TYPES = Object.freeze({
  MC: 'MC',
  MR: 'MR',

  TF: 'TF',
  SA: 'SA',

  FB: 'FB',
  MT: 'MT',

  SQ: 'SQ',
  HS: 'HS',

  DD: 'DD',
  DW: 'DW',

  SL: 'SL',
  NQ: 'NQ',

  LS: 'LS',
  EQ: 'EQ',
});

export const TYPES_LABEL = Object.freeze<{ [key in keyof typeof TYPES]: string }>({
  MC: 'Multiple Choice', // Multiple choice questions require learners to choose one answer from the available choices. They're great for testing general recognition of a subject.
  MR: 'Multiple Response', // Multiple response questions prompt learners to choose one or more answers from various alternatives. Useful for increasing the complexity of a quiz.

  TF: 'True/False', // For the true or false type of questions, the quiz taker needs to indicate whether the statement is true or false. Helpful for checking basic knowledge ot a topIc.
  SA: 'Short Answer', // For the short answer question type, a learner should know the right answer and enter it in the empty field. Great for checking proficiency in a subject.

  FB: 'Fill in the Blank', // The fill-in-the blank question prompts learners to fill in one or more blank fields in the text. Helpful if you need to check their understanding of specific processes or rules.
  MT: 'Matching', // Matching questions requires linking the items in the two columns. Useful for matching facts and concepts with their descriptions.

  SQ: 'Sequence', // Sequences prompt learners to arrange elements in a specific order. Great for chronologies
  HS: 'Hotspot', // Hotspots require marking one or more areas in the image. Great for checking visual recognition.

  DD: 'Drag-and-Drop', // Drag-and-drops are interactive mini games: you drag objects and drop them or their proper place. Useful for enhancing engagement.
  DW: 'Drag the words', // Drag the Words questions offer learners to drag proper words to their place in the text. Great for testing knowledge of definitions and multi-step processes.

  SL: 'Select from Lists', // For the select from lists questions, one chooses the right answer from a drop-down list. Such questions hide answers compactly, thus making a quiz look concise.
  NQ: 'Numeric Question', // For the numeric questions, learners need to add a number in the empty field. Great for checking accurate knowledge

  LS: 'Likert Scale', // Likert scale is a five-point model for assessing agreement or disagreement with a statement. Use it to evaluate learners' opinions, impressions, and attitudes.
  EQ: 'Essay Question', // Essays require learners to write a freestyle text. They're helpful for assessing critical thinking and discussion skills.
});
