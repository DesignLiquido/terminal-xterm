window.comandos = {
  help: {
    f: () => {
      const padding = 10;
      function formatMessage(name, description) {
        const maxLength = term.cols - padding - 3;
        let remaining = description;
        const d = [];
        while (remaining.length > 0) {
          // Trim any spaces left over from the previous line
          remaining = remaining.trimStart();
          // Check if the remaining text fits
          if (remaining.length < maxLength) {
            d.push(remaining);
            remaining = "";
          } else {
            let splitIndex = -1;
            // Check if the remaining line wraps already
            if (remaining[maxLength] === " ") {
              splitIndex = maxLength;
            } else {
              // Find the last space to use as the split index
              for (let i = maxLength - 1; i >= 0; i--) {
                if (remaining[i] === " ") {
                  splitIndex = i;
                  break;
                }
              }
            }
            d.push(remaining.substring(0, splitIndex));
            remaining = remaining.substring(splitIndex);
          }
        }
        const message =
          `  \x1b[36;1m${name.padEnd(padding)}\x1b[0m ${d[0]}` +
          d.slice(1).map((e) => `\r\n  ${" ".repeat(padding)} ${e}`);
        return message;
      }
      term.writeln(
        [
          "Welcome to xterm.js! Try some of the commands below.",
          "",
          ...Object.keys(commands).map((e) =>
            formatMessage(e, commands[e].description)
          ),
        ].join("\n\r")
      );
      prompt(term);
    },
    description: "Prints this help message",
  }
};
