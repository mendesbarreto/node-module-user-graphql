import { createServer } from 'http';
import { expressApp } from './app';

createServer(expressApp);
