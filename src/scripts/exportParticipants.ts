import { ofmiUserAuthId } from "@/lib/admin";
import { exportParticipants } from "@/lib/gcloud";
import { prisma } from "@/lib/prisma";
import { findMostRecentOfmi, registrationSpreadsheetsPath } from "@/lib/ofmi";

async function main(): Promise<void> {
  const userAuthId = await ofmiUserAuthId();
  const ofmi = await findMostRecentOfmi();
  const spreadsheetId = await exportParticipants({
    userAuthId,
    ofmi,
    spreadsheetName: registrationSpreadsheetsPath(ofmi.edition),
  });

  console.log(
    `Spreadsheet: https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
