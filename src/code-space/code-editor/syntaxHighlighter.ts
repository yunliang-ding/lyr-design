/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

const getLineNumberAndOffset = (start, lines) => {
  let line = 0;
  let offset = 0;
  while (offset + lines[line] < start) {
    offset += lines[line] + 1;
    line += 1;
  }
  return { line: line + 1, offset };
};

const flattenTagToken = (token) => {
  if (!Array.isArray(token.content)) return [token];
  const isEndTag = token.content[0].content[0].content === '</';
  if (isEndTag) {
    return [
      {
        type: 'end-tag-start',
        content: '</',
        length: 2,
      },
      {
        type: 'end-tag-name',
        content: token.content[0].content[1],
        length: token.content[0].content[1].length,
      },
      ...token.content.slice(1, token.content.length - 1),
      {
        type: 'end-tag-end',
        content: '>',
        length: 1,
      },
    ];
  }

  let arr = [...token.content];
  const result = [];
  while (arr.length) {
    const t = arr.shift();
    if (/attr-name|attr-value/.test(t.type)) result.push(t);
    else if (/spread/.test(t.type)) {
      result.push({
        ...t.content[0],
        type: 'jsx-exp-start',
      });
      result.push.apply(result, t.content.slice(1, t.content.length - 1));
      result.push({
        ...t.content[t.content.length - 1],
        type: 'jsx-exp-end',
      });
    } else if (t.type === 'script') {
      const i = t.content.findIndex((c) => c.content === '{');
      result.push.apply(result, [
        ...t.content.slice(0, i),
        {
          ...t.content[i],
          type: 'jsx-exp-start',
        },
        ...t.content.slice(i + 1, t.content.length - 1),
        {
          ...t.content[t.content.length - 1],
          type: 'jsx-exp-end',
        },
      ]);
    } else if (Array.isArray(t.content)) arr = [...t.content, ...arr];
    else result.push(t);
  }
  result[0].type = 'tag-start';
  result[1] = {
    type: 'start-tag-name',
    length: result[1].length,
    content: result[1],
  };
  result[result.length - 1].type = 'tag-end';
  return result;
};

const flattenTokens = (tokens) => {
  return tokens.reduce((prev, token) => {
    if (token.type === 'tag') prev.push.apply(prev, flattenTagToken(token));
    else prev.push(token);
    return prev;
  }, []);
};

const textMateService = (code) => {
  const Window: any = window;
  const Prism = Window.Prism;
  try {
    let tokens = Prism.tokenize(code, Prism.languages.jsx);
    const env = {
      code,
      grammar: Prism.languages.jsx,
      language: 'jsx',
      tokens,
    };
    Prism.hooks.run('after-tokenize', env);
    tokens = flattenTokens(tokens);
    const classifications = [];
    let pos = 0;
    const lines = code.split('\n').map((line) => line.length);
    tokens.forEach((token) => {
      if (typeof token === 'string') {
        if (token === 'console') {
          token = {
            content: 'console',
            type: 'globals',
            length: 7,
          };
        } else {
          pos += token.length;
          return;
        }
      }
      const { offset: startOffset, line: startLine } = getLineNumberAndOffset(
        pos,
        lines,
      );
      const { offset: endOffset, line: endLine } = getLineNumberAndOffset(
        pos + token.length,
        lines,
      );
      let kind = token.type;
      if (kind === 'keyword') kind = `${token.content}-keyword`;
      if (token.content === 'constructor' && token.type === 'function') {
        kind = 'constructor-keyword';
      }
      if (token.content === '=>') {
        kind = 'arrow-operator';
      }
      classifications.push({
        start: pos + 1 - startOffset,
        end: pos + 1 + token.length - endOffset,
        kind,
        startLine,
        endLine,
      });
      pos += token.length;
    });
    return classifications.map((classification) => ({
      range: new window.monaco.Range(
        classification.startLine,
        classification.start,
        classification.endLine,
        classification.end,
      ),
      options: {
        inlineClassName: classification.kind,
      },
    }));
  } catch (e) {
    console.log('exp:', e);
  }
};

export { textMateService };
