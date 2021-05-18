const regex = /[^/]+@=[^/]*\//g;
const regexArraySplitter = /[^/]+\//g;

/**
 * A function to serialize a JSON into string
 * @param records A JSON object to be serialized to string
 * @return        STT serialized string
 */
const serialize = (records) => {
  if (records === null) {
    return '';
  }
  if (typeof records === 'string') {
    return records.replace(/@/g, '@A').replace(/\//g, '@S');
  }
  if (typeof records === 'number') {
    return records.toString();
  }
  let serializedString = '';
  if (Array.isArray(records)) {
    return records.map(record => serialize(record).replace(/@/g, '@A').replace(/\//g, '@S') + '/').join('');
  }
  Object.entries(records).forEach(([key, value]) => {
    serializedString = serializedString + serialize(key).replace(/@/g, '@A').replace(/\//g, '@S') + '@=' + serialize(value).replace(/@/g, '@A').replace(/\//g, '@S') + '/';
  });

  return serializedString;
};

/**
 * A function to deserialized a string into JSON
 * @param message A STT serialized string, usually received from Douyu danmaku server
 * @return        STT deserialized JSON representing of the message
 */

const deserialize = (message) => {
  if (message === null) {
    return null;
  }
  const record = {};
  const entries = message.match(regex);
  if (entries !== null) {
    entries.forEach((entry) => {
      const kvps = entry.split('@=');
      const key = kvps[0].replace(/@S/g, '/').replace(/@A/g, '@');
      const value = kvps[1].slice(0, -1).replace(/@S/g, '/').replace(/@A/g, '@');
      record[deserialize(key)] = deserialize(value);
    });
    return record;
  }
  const items = message.match(regexArraySplitter);

  if (items !== null) {
    return items.map(item => deserialize(item.slice(0, -1).replace(/@S/g, '/').replace(/@A/g, '@')));
  }
  return message.replace(/@S/g, '/').replace(/@A/g, '@');
};

export default {
  serialize,
  deserialize,
};