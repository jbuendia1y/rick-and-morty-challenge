export default function TypedMachine(props: {
  children: string;
  timeTyping?: string;
  timeBlink?: string;
}) {
  const { timeBlink = "1", timeTyping = "2" } = props;

  return (
    <span className="typing">
      {props.children}
      <style jsx>{`
        .typing {
          display: block;
          font-family: monospace;
          white-space: nowrap;
          border-right: 4px solid;
          width: ${props.children.length + 1}ch;
          max-width: 100%;

          animation: typing ${timeTyping}s steps(${props.children.length}),
            blink ${timeBlink}s steps(1) infinite;
          overflow: hidden;
        }

        @keyframes typing {
          from {
            width: 0;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </span>
  );
}
