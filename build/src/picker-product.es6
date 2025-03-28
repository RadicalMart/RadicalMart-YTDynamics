(() => {
(function (r) {
  r.events.on("openItemPicker", function (t, e) {
    if (e.module !== "com_radicalmart") return;
    t.stopPropagation();
    const n = t.origin.$modal({
      render: function (o) {
        return o("div", {
          attrs: {
            "uk-overflow-auto": "expand: true"
          },
          on: {
            resize: function (i) {
              i.target.firstElementChild.style.height = i.target.style.maxHeight;
            }
          }
        }, [o("iframe", {
          attrs: {
            src: r.url("/administrator/index.php?option=com_radicalmart&view=products&layout=modal&tmpl=component", {
              function: "pickRMProduct"
            })
          },
          on: {
            load: function (i) {
              i.target.contentDocument.body.style.padding = "30px";
            }
          },
          style: {
            width: "100%",
            height: "100%"
          }
        })]);
      }
    });
    return window.pickRMProduct = function (t) {
      n.resolve(t), delete window.pickRMProduct;
    }, n.show({
      container: !0
    }).then(function (t) {
      return t.getAttribute("data-id");
    });
  }, 5), r.events.on("resolveItemTitle", function (t, e) {
    if (e.module === "com_radicalmart") return t.stopPropagation(), t.origin.$http.get("rm/products", {
      params: {
        ids: [e.id]
      }
    }).then(function (n) {
      return n.body[e.id];
    });
  }, 5);
})(window.Vue);
})()
;
