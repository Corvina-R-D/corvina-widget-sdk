/*
 * Text edits of JSON-like files (manifest.json, tsconfig.json with comments), keeping their formatting.
 */

/*
 * Appends item to the array of key: `"key": [ ... ]`. Returns the new text, or null when the array
 * is not found. Arrays with one item per line get the new item on its own line.
 */
function appendToArray(text, key, item) {
  const match = text.match(new RegExp(`("${key}"\\s*:\\s*\\[)([^\\]]*)\\]`));
  if (!match) return null;
  const [whole, open, items] = match;
  const value = JSON.stringify(item);
  const body = items.trimEnd();
  const tail = items.slice(body.length);
  let newItems;
  if (!items.trim()) {
    newItems = value;
  } else if (items.includes("\n")) {
    const indent = items.match(/\n([ \t]*)"[^"]*"\s*,?\s*$/)?.[1] ?? "    ";
    newItems = `${body.replace(/,$/, "")},\n${indent}${value}${tail}`;
  } else {
    newItems = `${body.replace(/,$/, "")}, ${value}${tail}`;
  }
  return text.replace(whole, () => `${open}${newItems}]`);
}

function arrayIncludes(text, key, item) {
  const match = text.match(new RegExp(`"${key}"\\s*:\\s*\\[([^\\]]*)\\]`));
  return !!match && match[1].includes(JSON.stringify(item));
}

module.exports = { appendToArray, arrayIncludes };
