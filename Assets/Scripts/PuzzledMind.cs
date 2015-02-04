using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class PuzzledMind : MonoBehaviour {

	public List<GameObject> BallsList;

	public GameObject swapball;

	void Start () {
	
	}
	
	void Update () {

	}

	void StartingBalls () { //FUTURE: Do me baby.
	
	}

	public void JoinPolys( GameObject one, GameObject two ){

	}

	public void SwapandParent( GameObject dad, GameObject kid ) { //Colliderpass: this vs other
	
		//This Somehow Works.  Wow.
		Color ballcol = dad.renderer.material.color;
		GameObject newgo = (GameObject)Instantiate(swapball, kid.transform.position, kid.transform.rotation);
		dad.gameObject.GetComponent<Drag>().gofollow = newgo;
		Destroy (kid);
		newgo.renderer.material.color = ballcol;
		newgo.transform.parent = dad.transform;
		dad.tag = "poly";
		newgo.tag = "poly";
	}

}

