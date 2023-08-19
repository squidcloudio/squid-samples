import { CSSProperties } from 'react';

const css: Record<string, CSSProperties> = {
  code: {
    whiteSpace: 'pre-wrap',
  },
  'code[class*="language-"]': {
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordSpacing: 'normal',
    wordBreak: 'break-all',
    wordWrap: 'normal',
    color: '#eee',
    background: '#1F2020',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '12px',
    lineHeight: '1.5em',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    borderRadius: '8px',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordSpacing: 'normal',
    wordBreak: 'break-all',
    wordWrap: 'normal',
    color: '#eee',
    background: '#1F2020',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '12px',
    lineHeight: '1.5em',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    position: 'relative',
    margin: '20px 0',
    padding: '16px 12px',
  },
  'code[class*="language-"]::-moz-selection': {
    background: '#363636',
  },
  'pre[class*="language-"]::-moz-selection': {
    background: '#363636',
  },
  'code[class*="language-"] ::-moz-selection': {
    background: '#363636',
  },
  'pre[class*="language-"] ::-moz-selection': {
    background: '#363636',
  },
  'code[class*="language-"]::selection': {
    background: '#363636',
  },
  'pre[class*="language-"]::selection': {
    background: '#363636',
  },
  'code[class*="language-"] ::selection': {
    background: '#363636',
  },
  'pre[class*="language-"] ::selection': {
    background: '#363636',
  },
  ':not(pre) > code[class*="language-"]': {
    whiteSpace: 'normal',
    borderRadius: '0.2em',
    padding: '0.1em',
  },
  '.language-css > code': {
    color: '#fd9170',
  },
  '.language-sass > code': {
    color: '#fd9170',
  },
  '.language-scss > code': {
    color: '#fd9170',
  },
  '[class*="language-"] .namespace': {
    opacity: '0.7',
  },
  atrule: {
    color: '#c792ea',
  },
  'attr-name': {
    color: '#ffcb6b',
  },
  'attr-value': {
    color: '#a5e844',
  },
  attribute: {
    color: '#a5e844',
  },
  boolean: {
    color: '#c792ea',
  },
  builtin: {
    color: '#ffcb6b',
  },
  cdata: {
    color: '#80cbc4',
  },
  char: {
    color: '#80cbc4',
  },
  class: {
    color: '#ffcb6b',
  },
  'class-name': {
    color: '#f2ff00',
  },
  comment: {
    color: '#616161',
  },
  constant: {
    color: '#c792ea',
  },
  deleted: {
    color: '#ff6666',
  },
  doctype: {
    color: '#616161',
  },
  entity: {
    color: '#ff6666',
  },
  function: {
    color: '#c792ea',
  },
  hexcode: {
    color: '#f2ff00',
  },
  id: {
    color: '#c792ea',
    fontWeight: 'bold',
  },
  important: {
    color: '#c792ea',
    fontWeight: 'bold',
  },
  inserted: {
    color: '#80cbc4',
  },
  keyword: {
    color: '#c792ea',
  },
  number: {
    color: '#fd9170',
  },
  operator: {
    color: '#89ddff',
  },
  prolog: {
    color: '#616161',
  },
  property: {
    color: '#80cbc4',
  },
  'pseudo-class': {
    color: '#a5e844',
  },
  'pseudo-element': {
    color: '#a5e844',
  },
  punctuation: {
    color: '#89ddff',
  },
  regex: {
    color: '#f2ff00',
  },
  selector: {
    color: '#ff6666',
  },
  string: {
    color: '#a5e844',
  },
  symbol: {
    color: '#c792ea',
  },
  tag: {
    color: '#ff6666',
  },
  unit: {
    color: '#fd9170',
  },
  url: {
    color: '#ff6666',
  },
  variable: {
    color: '#ff6666',
  },
};

export default css;
