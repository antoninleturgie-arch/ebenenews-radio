const test = require("node:test");
const assert = require("node:assert/strict");
const { uniqueAnnouncements } = require("./announcement-utils.js");

test("ne conserve qu'une occurrence d'un même résumé RSS malgré des titres différents", () => {
  const first = {
    sourceTitle: "OM-Levski Sofia : les images des affrontements",
    kind: "auto-news",
    source: "Le Monde",
    text: "Flash automatique : Les images des affrontements entre les supporteurs au Vélodrome. Source : Le Monde."
  };
  const duplicate = {
    sourceTitle: "Les images des affrontements entre supporteurs",
    kind: "auto-news",
    source: "Le Monde",
    text: "Flash automatique : Les images des affrontements entre les supporteurs au Vélodrome. Source : Le Monde."
  };
  const distinct = {
    sourceTitle: "Une autre actualité",
    kind: "auto-news",
    source: "Le Monde",
    text: "Flash automatique : Une autre actualité importante aujourd'hui. Source : Le Monde."
  };

  assert.deepEqual(uniqueAnnouncements([first, duplicate, distinct]), [first, distinct]);
});

test("fusionne des titres RSS proches partageant le même résumé", () => {
  const shared = "L’avant-match de Ligue Europa entre Marseille et le Levski a été émaillé d’incidents importants entre supporteurs des deux équipes, avec des bagarres et des jets de projectiles et de fumigènes.";
  const first = {
    kind: "auto-news", source: "Le Monde",
    text: "Flash automatique : OM-Levski Sofia : les images des affrontements entre les supporteurs au Vélodrome. " + shared + " Source : Le Monde."
  };
  const second = {
    kind: "auto-news", source: "Le Monde",
    text: "Flash automatique : Les images des affrontements entre les supporteurs de l’OM et du Levski Sofia. " + shared + " Source : Le Monde."
  };
  const third = {
    kind: "auto-news", source: "Le Monde",
    text: "Flash automatique : Football : les images des affrontements entre les supporteurs de l’OM et du Levski Sofia. " + shared + " Source : Le Monde."
  };

  assert.deepEqual(uniqueAnnouncements([first, second, third]), [first]);
});

test("normalise les accents, la casse, la ponctuation et les espaces", () => {
  const first = { text: "L’été arrive bientôt !" };
  const duplicate = { text: "l ete arrive bientot" };
  assert.deepEqual(uniqueAnnouncements([first, duplicate]), [first]);
});

test("préserve les sujets différents", () => {
  const first = { kind: "auto-news", source: "Le Monde", text: "Première information sur les transports en France." };
  const second = { kind: "auto-news", source: "Le Monde", text: "Deuxième information concernant la météo en Italie." };
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
