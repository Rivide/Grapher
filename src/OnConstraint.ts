class OnConstraint extends Constraint {
  targetObj: GeomObject;
  constructor(targetObj: GeomObject) {
    super();
    this.targetObj = targetObj;
  }
  apply(obj: Vector, transformations: {}) {
    let targetObjTransformation: Transformation = transformations[this.targetObj.id];
    let target: GeomObject;
    let object: Vector;
    if (targetObjTransformation) {
      target = targetObjTransformation.apply(this.targetObj);
      object = targetObjTransformation.apply(obj) as Vector;
    }
    else {
      target = this.targetObj;
      object = obj;
    }
    transformations[obj.id] = new Translation(target.pointClosestTo(object).subtract(obj));
  }
}