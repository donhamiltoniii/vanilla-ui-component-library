import Html from "./Html.js";

describe("Html", () => {
  describe("constructor", () => {
    describe("should return new instance if none exists", () => {
      test("should be an 'object'", () => {
        expect(typeof Html().create("div")).toBe("object");
      });
    });
  });

  describe("addClass", () => {
    test("Throws an error when class already exists", () => {
      const underTest = Html().create("div");
      underTest.render().classList.add("test");

      expect(() => {
        underTest.addClass("test");
      }).toThrow("Class already exists on element.");
    });

    test("should add a class to an element", () => {
      const underTest = Html().create("div");
      underTest.addClass("test");

      expect(underTest.render().classList.contains("test")).toBeTruthy();
    });
  });

  describe("text", () => {
    test("Return current value", () => {
      const underTest = Html().create("div");
      underTest.render().textContent = "test content";

      expect(underTest.text()).toBe("test content");
    });

    test("Sets value when given a parameter", () => {
      const underTest = Html().create("div");
      underTest.text("test content");

      expect(underTest.text()).toBe("test content");
    });
  });

  describe("addChild", () => {
    test("Throws error if given an improper HTML element", () => {
      const underTest = Html().create("div");
      const elementToAdd = Html().create("Donny");
      console.log(elementToAdd);

      expect(() => underTest.addChild(elementToAdd)).toThrow(
        "Invalid HTML tag"
      );
    });

    test("Adds valid HTML element", () => {
      const underTest = Html().create("div");
      const elementToAdd = Html().create("span");
      underTest.addChild(elementToAdd);

      expect(underTest.render().querySelector("span")).toStrictEqual(
        elementToAdd.render()
      );
    });
  });

  describe("create", () => {
    test("creates an element", () => {
      const underTest = Html().create("div");

      expect(underTest.render() instanceof HTMLDivElement).toBeTruthy();
    });
  });
});