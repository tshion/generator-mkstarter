.PHONY: default
default: run-xcodegen


# 開発環境のセットアップ
init:
	sh scripts/bootstrap.sh
	@make run-xcodegen

# xcodegen の実行(プロジェクトファイル生成など)
run-xcodegen:
	mint run xcodegen generate
