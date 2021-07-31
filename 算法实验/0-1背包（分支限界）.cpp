#include<iostream>
#include<algorithm>
#include<queue>
using namespace std;

int N;  //物品个数
int W;  //背包承重量

// 物品的结构体
struct Item{
	int itemId; //物品序号
	int weight; //重量
	int val;    //价值
	int ratio;  //价值重量比
};

// 状态空间树的节点
struct Node {
	int val;  //该结点的价值
	int weight; //该结点的总重量
	float bound;  //该节点的价值上界
	int level;  //层次
	struct Node* parent; //父节点

	// 初始化节点
	Node() {
		val = 0;
		weight = 0;
		level = 0;
		parent = 0;
		bound = 0;
	}
};

//按照大顶堆的形式存放
struct cmp{
	bool operator()(Node* a, Node* b) {
		return a->bound > b->bound;  // 按照bound从大到小排列，先处理bound大的节点,界限更大装的东西可能就越多
	}
};

bool compare(Item item1, Item item2);
int branchAndBound(Item items[], int W);
float maxBound(Node* node, Item items[], int c);


int main(int argc, char** argv) {
	int maxVal;  //背包能装的最大价值
	cout << "请输入物品的个数:";
	cin >> N;
	cout << "请输入背包容量:";
	cin >> W;

	int* w = new int[N];
	int* v = new int[N];

	cout << "请依次输入" << N << "个物品的重量：";
	for (int i = 0; i < N; i++) {
		cin >> w[i];
	}
	cout << "请依次输入" << N << "个物品的价值：";
	for (int i = 0; i < N; i++) {
		cin >> v[i];
	}
	cout << endl;
	Item* items = new Item[N];
	// 初始化物品结构体数组
	for (int i = 0; i < N; i++) {
		items[i].itemId = i;
		items[i].weight = w[i];
		items[i].val = v[i];
		items[i].ratio = float(v[i] / w[i]);
	}

	// 按价值重量比排序
	sort(items, items + N, compare);

	cout << "选取的方案为：" << endl;
	maxVal = branchAndBound(items,W);
	cout << "背包能装的最大价值为:" << maxVal;
}

// 比较大小
bool compare(Item item1, Item item2) {
	return item1.ratio > item2.ratio;  // 按照ratio从大到小排列
}

// 分支限界函数
int branchAndBound(Item items[], int W) {
	int maxVal = 0;  //最大价值
	//x 数组记录该物体最后是否被装入背包，装入值为1，为装入为0
	int* x = new int[N];
	for (int i = 0; i < N; i++){
		x[i] = 0;  
	}

	Node* maxNode = new Node();  //当前最大价值的节点
	//             数据类型|容器类型| 比较方式（大顶堆）
	priority_queue<Node*, vector<Node*>, cmp> maxQueue; //优先队列,里面为可选节点
	Node* rootNode, * curNode; // 根节点，当前节点

	rootNode = new Node();
	rootNode->bound = maxBound(rootNode, items, W);
	rootNode->parent = NULL;
	maxQueue.push(rootNode);
	maxVal = 0;
	maxNode = rootNode;
	while (!maxQueue.empty()) {   // 可选节点不为空
		curNode = maxQueue.top();
		maxQueue.pop();

		// 扩展左孩子
		if (curNode->weight + items[curNode->level].weight <= W) {
			Node* leftNode = new Node();
			leftNode->val = curNode->val + items[curNode->level].val;
			leftNode->weight = curNode->weight + items[curNode->level].weight;
			leftNode->level = curNode->level + 1;
			leftNode->parent = curNode;
			leftNode->bound = maxBound(leftNode, items, W);
			if (leftNode->level < N) {
				maxQueue.push(leftNode);  //符合要求的点加入队列
			}
			if (leftNode->val > maxVal) {
				maxVal = leftNode->val;
				maxNode = leftNode;
			}
		}

		// 扩展右孩子节点
		if (maxBound(curNode, items, W) > maxVal) {
			Node* rightNode = new Node();
			rightNode->val = curNode->val;
			rightNode->weight = curNode->weight;
			rightNode->level = curNode->level + 1;
			rightNode->parent = curNode;
			rightNode->bound = maxBound(rightNode, items, W);
			if (rightNode->level < N) {
				maxQueue.push(rightNode);
			}
			if (rightNode->val > maxVal) {
				maxVal = rightNode->val;
				maxNode = rightNode;
			}
		}
	}

    // 可选节点为空了
	curNode = maxNode;
	while (curNode) {
		int tempVal = curNode->val;
		curNode = curNode->parent;
		if (curNode && curNode->val != tempVal) {   //说明该节点是父节点的左孩子
			x[items[curNode->level].itemId] = 1;   // 记录该结点被装进了背包
		}
	}

	cout << "物品被装入背包的情况，1为装进背包，0为未装进背包：" << endl;
	for (int i = 0; i < N; i++) {
		cout << x[i] << " ";
	}
	cout << endl;
	return maxVal;
}

float maxBound(Node* node, Item items[], int W) {
	// node 是当前需要判断的节点
	float upperBound; //上界 
	int rest;  //剩余容量
	int i;  //第几件物品

	upperBound = node->val;
	rest = W - node->weight;
	i = node->level;

	if (rest >= 0) {
		upperBound += rest * items[i].ratio;
	}

	return upperBound;
}