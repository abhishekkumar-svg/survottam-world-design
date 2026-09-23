import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface ContactInputProps {
  label: string;
  textarea?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const ContactInput = ({
  label,
  textarea = false,
  inputProps,
  textareaProps,
}: ContactInputProps) => {
  return (
    <div className="contact-input-group">
      <label>{label}</label>

      {textarea ? (
        <textarea
          className="contact-input contact-textarea"
          placeholder="Type something if you want..."
          {...textareaProps}
        />
      ) : (
        <input
          className="contact-input"
          {...inputProps}
        />
      )}
    </div>
  );
};

export default ContactInput;