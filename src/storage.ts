// 1 GCS file interaction
// 2 local file interaction

import { Storage } from "@google-cloud/storage";
import fs from 'fs';
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucketName = "yt-raw-videos";
const processedVideoBucketName = "yt-processed-videos";

const localRawVideoPath = '.raw-videos';
const localProcessedVideoPa = ""