export default function resolveValue (value, defaultValue, fallbackValue) {
  if (value !== undefined) {
    return value;
  } else if (defaultValue !== undefined) {
    return defaultValue
  } else {
    return fallbackValue;
  }
}
