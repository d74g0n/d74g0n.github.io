using UnityEngine;
using System.Collections;

public class Drag : MonoBehaviour {

	Vector3 dist;
	float posX;
	float posY;

	public GameObject _God; //GetComp PuzzledMind is easier derp.
	public float speed; //NOTE: set as 2.0f
//	public float stickforce;
	public bool isstuck;
	public GameObject gofollow;
	public GameObject Selector;
	public Material SelectionMat;

	void Start(){
	//	stickforce = 0.1f;
		isstuck = false;
	}

	void OnCollisionEnter( Collision other ){
		//Debug.Log (other.gameObject.tag);
		if(other.gameObject.tag == "ball"){
			bool otherstuck = other.gameObject.GetComponent<Drag>().isstuck; 
			if(!isstuck && !otherstuck){
				if(this.renderer.material.color == other.collider.gameObject.renderer.material.color){
					isstuck = true;
				//	gofollow = other.gameObject; INFO: BELIEVED OBSOLETE! Parenting eliminates Force Grip!
					_God.GetComponent<PuzzledMind>().SwapandParent(this.gameObject, other.gameObject);
					//isstuck = false; //INFO: Adding this back in causes both to delete eachother.
				}
			}
		}//EoF: ball 
		else if (other.gameObject.tag =="poly") {
			if( this.renderer.material.color == other.collider.gameObject.renderer.material.color) {
//			if( !isstuck && this.renderer.material.color == other.collider.gameObject.renderer.material.color) {
				_God.GetComponent<PuzzledMind>().SwapandParent(other.gameObject, this.gameObject);
			}
		}//EoF: poly
	
	}

	void OnMouseDown(){
		Selector.renderer.material = SelectionMat;
		Selector.transform.position = this.transform.position;
		Selector.particleSystem.startColor = this.renderer.material.color;
		Selector.particleSystem.Emit(50);
		Selector.particleSystem.enableEmission = true;
		dist = Camera.main.WorldToScreenPoint(transform.position);
		posX = Input.mousePosition.x - dist.x;
		posY = Input.mousePosition.y - dist.y;
	}

	void OnMouseDrag(){
		Selector.transform.position = this.transform.position;
		Vector3 curPos = new Vector3(Input.mousePosition.x - posX, Input.mousePosition.y - posY, dist.z);
		Vector3 worldPos = Camera.main.ScreenToWorldPoint(curPos);
		rigidbody.velocity = (worldPos - rigidbody.position) * speed; //working perfect!
	}

	void OnMouseUp(){
		Selector.transform.position = this.transform.position;
		Selector.renderer.material.color = Color.clear;
		Selector.particleSystem.enableEmission = false;
	}

	void Update(){
	
	}
	//

}
