import {
  Prisma,
  Tube as TubeType,
  TubeColor as TubeColorType,
} from "@prisma/client";

// Define a type for Club with its relations
const tubeLevelWithRelations = Prisma.validator<Prisma.TubeLevelArgs>()({
  include: {
    tubeColors: true,
    tubes: true,
    tubeColorRelation: {
      include: {
        tube: true,
        tubeColor: true,
      },
    },
  },
});

export type TubeLevel = Prisma.TubeLevelGetPayload<
  typeof tubeLevelWithRelations
> & {
  _count: {
    tubeMoves: number;
  };
};

const tubeColorRelations = Prisma.validator<Prisma.TubeLevelArgs>()({
  include: {
    tube: true,
    tubeColor: true,
  },
});

export type TubeColorRelation = Prisma.TubeColorRelationGetPayload<
  typeof tubeColorRelations
>;

export type Tube = Prisma.TubeGetPayload<typeof tubeRelations>;

export type TubeColor = TubeColorType;

const tubeMovesRelations = Prisma.validator<Prisma.TubeMovesArgs>()({
  include: {
    fromTube: true,
    toTube: true,
  },
});

export type TubeMove = Prisma.TubeMoveGetPayload<typeof tubeMovesRelations>;
