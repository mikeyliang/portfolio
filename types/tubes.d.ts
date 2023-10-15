import {
  Prisma,
  Tube as TubeType,
  TubeColor as TubeColorType,
} from "@prisma/client";

// Define a type for Club with its relations
const tubeLevelWithRelations = Prisma.validator<Prisma.TubeLevelArgs>()({
  include: {
    tube: {
      include: {
        tubeColors: true,
        tubes: true,
        tubeMoves: true,
      },
    },
  },
});

export type TubeLevel = Prisma.ClubGetPayload<typeof tubeLevelWithRelations>;

const tubeRelations = Prisma.validator<Prisma.TubeArgs>()({
  include: {
    tubeColorRelation: true,
  },
});

export type Tube = Prisma.ClubGetPayload<typeof tubeRelations>;

export type TubeColor = TubeColorType;

const tubeMovesRelations = Prisma.validator<Prisma.TubeMovesArgs>()({
  include: {
    tubeFrom: true,
    tubeTo: true,
  },
});

export type TubeMove = Prisma.ClubGetPayload<typeof tubeMovesRelations>;
