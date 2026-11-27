const test = require("node:test");
const assert = require("node:assert/strict");
const { uniqueAnnouncements } = require("./announcement-utils.js");

test("ne conserve qu'une occurrence d'un même résumé RSS malgré des titres différents", () => {
  const first = {
    sourceTitle: "OM-Levski Sofia : les images des affrontements",
    text: "Flash automatique : Les images des affrontements entre les supporteurs au Vélodrome. Source : Le Monde."
  };
  const duplicate = {
    sourceTitle: "Les images des affrontements entre supporteurs",
    text: "Flash automatique : Les images des affrontements entre les supporteurs au Vélodrome. Source : Le Monde."
  };
  const distinct = {
    sourceTitle: "Une autre actualité",
    text: "Flash automatique : Une autre actualité importante aujourd'hui. Source : Le Monde."
  };

  assert.deepEqual(uniqueAnnouncements([first, duplicate, distinct]), [first, distinct]);
});

test("normalise les accents, la casse, la ponctuation et les espaces", () => {
  const first = { text: "L’été arrive bientôt !" };
  const duplicate = { text: "l ete arrive bientot" };
  assert.deepEqual(uniqueAnnouncements([first, duplicate]), [first]);
});

test("préserve l'ordre et les sujets différents", () => {
  const first = { text: "Première information." };
  const second = { text: "Deuxième information." };
  assert.deepEqual(uniqueAnnouncements([first, second]), [first, second]);
});

test("ignore les entrées invalides et les annonces sans contenu", () => {
  assert.deepEqual(uniqueAnnouncements([null, "texte", {}, { text: "  " }]), []);
});

test("ne modifie pas le tableau source", () => {
  const items = [{ text: "Même sujet." }, { text: "Même sujet !" }];
  const originalLength = items.length;
  uniqueAnnouncements(items);
  assert.equal(items.length, originalLength);
});
