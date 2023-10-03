import { toText } from "../lib/common";
import { getContext } from "../services/userService";
import { User } from "./user";

export const noPromptCode = "_none";
export const customPromptCode = "_custom";
export const customPromptName = "Свой промт";

export type ModeCode = "free" | "role" | "prompt";

export interface Mode {
  code: ModeCode;
  name: string;
  description: string;
}

const modes: Mode[] = [
  {
    code: "free",
    name: "Свободный диалог",
    description: "Свободный диалог..."
  },
  {
    code: "role",
    name: "Роль",
    description: "Роль..."
  },
  {
    code: "prompt",
    name: "Свой промт",
    description: "Свой промт..."
  }
];

interface PromptDefaults {
  modeCode: ModeCode;
  promptCode: string;
}

export interface Prompt {
  language: "ru" | "en"
  code: string;
  name: string;
  content: string;
  intro: string;
}

const prompts: Prompt[] = [
  {
    language: "ru",
    code: "idea-generator",
    name: "Генератор идей",
    content: "Ммм...",
    intro: "Ммм..."
  },
  {
    language: "ru",
    code: "psychologist",
    name: "Психолог",
    content: "Ммм...",
    intro: "Ммм..."
  },
  {
    language: "ru",
    code: "coach",
    name: "Коуч",
    content: "Ммм...",
    intro: "Ммм..."
  },
  {
    language: "ru",
    code: "chef",
    name: "Повар",
    content: "Ммм...",
    intro: "Ммм..."
  },
  {
    language: "ru",
    code: "english-tutor",
    name: "Репетитор по английскому языку",
    content: "Ммм...",
    intro: "Ммм..."
  },
  {
    language: "ru",
    code: "kids-animator",
    name: "Аниматор для детей",
    content: "Ммм...",
    intro: "Ммм..."
  }
];

export function getPromptDefaults(): PromptDefaults {
  return {
    modeCode: "free",
    promptCode: noPromptCode
  };
}

export function getPrompts(): Prompt[] {
  return prompts;
}

export function getPromptByCode(code: string): Prompt | null {
  return prompts.find(p => p.code === code) ?? null;
}

export function getPromptName(code: string): string | null {
  if (code === customPromptCode) {
    return customPromptName;
  }

  return getPromptByCode(code)?.name ?? null;
}

export function getModes(): Mode[] {
  return modes;
}

export function getModeByCode(code: string): Mode | null {
  return modes.find(m => m.code === code) ?? null;
}

export function getModeName(user: User): string | null {
  const context = getContext(user);

  if (!context) {
    return "Неизвестный режим";
  }

  const mode = getModeByCode(context.modeCode);

  if (!mode) {
    return getPromptName(context.promptCode);
  }

  if (mode.code !== "role") {
    return mode.name;
  }

  return `${mode.name} «${getPromptName(context.promptCode)}»`;
}
