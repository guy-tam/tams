// נקודת כניסה למערכת המדריך
export { askGuide, getSuggestedQuestions, explainCurrentPage } from "./assistantEngine";
export type { GuideResponse } from "./assistantEngine";
export { sitePages, topicMap, glossary, navigationFlows } from "./siteKnowledge";
export type { PageKnowledge, TopicEntry, GlossaryEntry, NavigationFlow } from "./siteKnowledge";
