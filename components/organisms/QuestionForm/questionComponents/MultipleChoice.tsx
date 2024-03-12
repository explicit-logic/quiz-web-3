// Types
import type { Formik } from '../QuestionForm.types';
import type { Parse } from '@/lib/client/markdownRender/markdownRender.types';

export type Props = {
  formik: Formik;
  parse: Parse;
  question: Questions.MultipleChoice;
};

export default function MultipleChoice(props: Props) {
  const { formik, parse, question } = props;

  return (
    <fieldset>
      {question.items.map((item, index) => {
        const value = (index + 1).toString();
        const id = `${question.id}-${value}`;
        const name = question.id;

        return (
          <div key={id} className="flex items-center mb-4">
            <input
              id={id}
              type="radio"
              name={name}
              onChange={formik.handleChange}
              value={value}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              // checked={formik.values[name] === value}
            />
            <label htmlFor={id} className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {parse(item.tokens)}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
