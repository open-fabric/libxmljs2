include('helpers.js');

describe('Document traversal', function() {
  it('can get to the document from any node', function() {
    var gchild = null;
    var doc = new libxml.Document(function(n) {
      n.node('root', function(n) {
        n.node('child', function(n) {
          gchild = n.node('grandchild');
        });
      });
    });

    assertEqual(doc, gchild.doc());
  });

  it('can travel down the tree', function() {
    var gchild = null;
    doc = new libxml.Document(function(n) {
      n.node('root', function(n) {
        n.node('child', function(n) {
          gchild = n.node('grandchild');
        });
      });
    });
    // uses the specific and default syntax for returning a child.
    assertEqual(gchild, doc.child(1).child());
  });

  it('can travel across siblings', function() {
    var sibling = null;
    doc = new libxml.Document(function(n) {
      n.node('root', function(n) {
        n.node('child');
        sibling = n.node('sibling');
      });
    });
    assertEqual(sibling, doc.child(2));
  });
});