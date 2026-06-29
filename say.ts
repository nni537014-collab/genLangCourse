import say from "say";
import { execSync } from "child_process";

const wavFile = "output.wav";
const mp3File = "output.mp3";


function listVoices() {
  const ps = `
Add-Type -AssemblyName System.Speech;
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer;
$s.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name }
`;
10548787

  console.log("Installed voices:\n", result.split("\n").map(v => v.trim().toLowerCase()).filter(v => v.length > 0).join("\n"));
}

listVoices();


say.export("Hello world", "Microsoft Hazel Desktop", 1, wavFile, (err) => {
  if (err) return console.error(err);

  //execSync(`ffmpeg -y -i ${wavFile} ${mp3File}`);
  console.log("MP3 saved:", mp3File);
});
