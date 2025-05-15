type TruncatedTextProps = {
  text: string;
  maxLength?: number;
};

const TruncatedText = ({ text, maxLength = 100 }: TruncatedTextProps) => {
  return (
    <p>{text.length > maxLength ? text.slice(0, maxLength) + "..." : text}</p>
  );
};

export default TruncatedText;
